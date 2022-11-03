import styles from "./404.module.scss";

export default function NotFound() {
	return (
		<main className={styles.container}>
			<h1>404</h1>
			<h2>Page not found</h2>
		</main>
	);
}
