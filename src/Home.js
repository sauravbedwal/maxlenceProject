import React, { useEffect, useState } from "react";
import SearchAppBar from "./SearchAppBar";
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, [page, searchQuery]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products`);
            const allProducts = response.data;

            const filteredProducts = allProducts.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

            const itemsPerPage = 8; 
            const calculatedTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);

            setTotalPages(calculatedTotalPages);

            const startIdx = (page - 1) * itemsPerPage;
            const endIdx = startIdx + itemsPerPage;
            const productsForCurrentPage = filteredProducts.slice(startIdx, endIdx);

            setProducts(productsForCurrentPage);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <SearchAppBar handleSearchChange={handleSearchChange} />
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px', height: '300px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </div>
                                <Typography variant="body1" color="text.primary">
                                    Price: ${product.price}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>
        </>
    );
};

export default Home;
