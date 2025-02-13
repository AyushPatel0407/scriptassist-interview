import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosAPI from '../../api/useAxiosAPI';
import { ApiRoute } from '../../api/apiRoutes';

const PersonDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Extract ID from route params
    const { getData } = useAxiosAPI()

    // Use React Query to fetch the person's details
    const { data, isLoading, isError, error } = useQuery(
        ['person', id],
        () => {
            let data = getData(ApiRoute.People.listPeople, id);
            return data
        },
        {
            enabled: !!id, // Only run  query if ID is available
        }
    );

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;

    return (
        <div>
            <h1>{data.name}</h1>
            <p>Height: {data.height}</p>
            <p>Mass: {data.mass}</p>
            <p>Hair Color: {data.hair_color}</p>
            <p>Skin Color: {data.skin_color}</p>
            <p>Eye Color: {data.eye_color}</p>
            <p>Birth Year: {data.birth_year}</p>
            <p>Gender: {data.gender}</p>
        </div>
    );
};

export default PersonDetails;
