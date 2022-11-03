const SpecialTemplate: Page = ({ data }: any) => {
	return (
		<main>
			<h1>This page uses a Special Template</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

export default SpecialTemplate;
