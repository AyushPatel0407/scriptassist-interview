import React from 'react';
import { Button, Group, TextInput, Box, Container } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useAppStore } from '../../store/app.store';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const login = useAppStore((state) => state.login);

    const form: UseFormReturnType<FormValues> = useForm<FormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value: string) =>
                value.length >= 8 &&
                    /[A-Z]/.test(value) && // Check for uppercase letter
                    /[a-z]/.test(value) && // Check for lowercase letter
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) // Check for special character
                    ? null
                    : 'Password must be at least 8 characters long, include one uppercase, one lowercase, and one special character',
        },
    });

    const onFinish = (values: {
        email: string;
        password: string;
    }) => {
        const success = login(values.email, values.password);
        if (success) {
            navigate('/'); // Redirect to a private page
        } else {
            alert('Invalid credentials');
        }

    };

    return (
        <Container size={400} style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Box
                sx={{
                    width: '100%',
                    padding: '2rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                }}
            >
                <form onSubmit={form.onSubmit((values) => onFinish(values))}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />

                    <TextInput
                        withAsterisk
                        label="Password"
                        type="password"
                        placeholder="Your password"
                        {...form.getInputProps('password')}
                    />

                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
