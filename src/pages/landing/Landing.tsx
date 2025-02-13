import { FC } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TableComponent from '../../components/Table/Table';

const Landing: FC = () => {

	return <>
		<Navbar />
		<TableComponent />
		<Footer />
	</>;
};

export default Landing

