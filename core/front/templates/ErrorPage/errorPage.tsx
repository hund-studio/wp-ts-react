import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import errorPage from "./errorPage.module.scss";

interface ErrorProps {
	status: number;
}

const FallbackTemplate: FC<ErrorProps> = ({ status }) => {
	return (
		<main className={errorPage.container}>
			<h1 className={errorPage.title}>{status}</h1>
			<p className={errorPage.content}>Something wrong happened</p>
		</main>
	);
};

const ErrorPage: FC<ErrorProps> = ({ status }) => {
	const [element, setElement] = useState<ReactNode>();

	useEffect(() => {
		import(`@views/pages/${status}`)
			.then(({ default: page }) => {
				setElement(page);
			})
			.catch((e) => {
				setElement(<FallbackTemplate status={status} />);
			});
	}, []);

	return <Fragment>{element}</Fragment> || null;
};

export default ErrorPage;
