const Page: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Page</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

export default Page;
