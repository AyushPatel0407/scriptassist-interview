import React, { useState } from 'react';
import { Table, Input, Button, Group, Container, Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { ApiRoute } from '../../api/apiRoutes';
import { useNavigate } from 'react-router-dom';
import useAxiosAPI from '../../api/useAxiosAPI';


// Fetch data function for paginated Star Wars people
const fetchPeople = async (page: number) => {
    const response: AxiosResponse<any> = await axios.get(`${import.meta.env.VITE_API_KEY}${ApiRoute.People.listPeople}?page=${page}`);
    return response.data;
};

const TableComponent: React.FC = () => {
    const navigate = useNavigate();
    const {getData} = useAxiosAPI()
    const [page, setPage] = useState<Number>(1); // Current page state
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search state
    const [sortColumn, setSortColumn] = useState<string | null>(null); // Sort column state
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Sort direction state

    // Use React Query to fetch people data with pagination
    const { data, isLoading, isError, error } = useQuery(
        ['people', page],
        () => {
            let param:Number = page
            let data =  getData(ApiRoute.People.listPeople,null,`page=${param}`);
            return data
        },
        {
            keepPreviousData: true, // Keep previous data while fetching new data
        }
    );

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;

    // Handle error state
    if (isError) return <div>Error: {(error as Error).message}</div>;

    // Filter and Search logic
    const filteredData = data.results && data?.results.filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting logic
    const sortedData = filteredData && filteredData?.sort((a: any, b: any) => {
        if (!sortColumn) return 0;
        const isAsc = sortDirection === 'asc';
        if (sortColumn === 'name') {
            return isAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (sortColumn === 'height') {
            return isAsc ? a.height - b.height : b.height - a.height;
        }
        return 0;
    });

    // Pagination logic (Note: SWAPI has 10 items per page by default)
    const totalPages = Math.ceil(data?.count / 10);

    // Sorting handler
    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };
    const handleRowClick = (id: number) => {
        navigate(`/person/${id}`); // Navigate to the detail page for the person
    };


    return (
        <Container style={{ height: "75vh", width: "100%" }}>
            {/* Search Bar */}
            <Input
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                mb="md"
            />

            {/* Table */}
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        <th>
                            <Button
                                variant="subtle"
                                onClick={() => handleSort('name')}
                            >
                                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="subtle"
                                onClick={() => handleSort('height')}
                            >
                                Height {sortColumn === 'height' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </Button>
                        </th>
                        <th>Birth Year</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.length > 0 ? (
                        sortedData.map((person: any, index: number) => (
                            <tr key={index} onClick={() => handleRowClick(person.url.split('/').slice(-2, -1)[0])}>
                                <td>{person.name}</td>
                                <td>{person.height}</td>
                                <td>{(person.birth_year)}</td>
                                <td>{person.gender}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No data found</td>
                        </tr>
                    )}
                </tbody>
            </Table>


            {/* Pagination */}
            <Group position="center" mt="md">
                <Pagination
                    total={totalPages}
                    page={page}
                    onChange={setPage}
                />
            </Group>
        </Container>
    );
};

export default TableComponent;
