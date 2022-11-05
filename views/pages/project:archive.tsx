import { usePostType, useTaxonomies } from "@core/hooks";
import { Link } from "@core/Link";
import { MenuOnTop } from "@views/layouts/menuOnTop/MenuOnTop";
import { removeEmptyParams } from "core/front/utils";
import { Fragment, useEffect, useState } from "react";

const ProjectArchive: Page = ({ data }: any) => {
	const [currentTax, setCurrentTax] = useState<string>("");
	const [currentTerm, setCurrentTerm] = useState<string[]>([]);

	const { data: taxonomies } = useTaxonomies();
	const { data: filteredPosts } = usePostType(
		removeEmptyParams({
			relation: "OR",
			post_type: "project",
			[currentTax]: currentTerm,
		})
	);

	useEffect(() => {
		setCurrentTerm([]);
	}, [currentTax]);

	const terms = taxonomies?.find((i: any) => i.slug === currentTax)?.terms;

	return (
		<main>
			<h1>Archive Project page</h1>
			<p>
				This page uses the
				<mark>
					<code>project:archive.tsx</code>
				</mark>
				template.
			</p>
			{taxonomies && !!taxonomies.length && (
				<Fragment>
					<hr />
					<select
						onChange={(event) => setCurrentTax(event.target.value)}
						defaultValue='default'>
						<option value={"default"} disabled>
							Filter by:
						</option>
						{taxonomies.map((filter: any, index: number) => (
							<option key={index} value={filter.slug}>
								{filter.label}
							</option>
						))}
					</select>
				</Fragment>
			)}
			{terms && !!terms.length && (
				<Fragment>
					<hr />
					<div>
						Terms:{" "}
						{terms.map((term: any, index: number) => {
							const isActive = currentTerm.includes(term.slug);
							return (
								<Fragment key={index}>
									<button
										className={isActive ? "active" : undefined}
										onClick={() =>
											isActive
												? setCurrentTerm(
														currentTerm.filter((i) => i !== term.slug)
												  )
												: setCurrentTerm([...currentTerm, term.slug])
										}>
										{term.name}
									</button>{" "}
								</Fragment>
							);
						})}
					</div>
				</Fragment>
			)}
			{filteredPosts && (
				<ol>
					{filteredPosts.map((item: any, index: number) => (
						<li key={index}>
							<Link to={item.url}>{item.post_title}</Link>
						</li>
					))}
				</ol>
			)}
		</main>
	);
};

ProjectArchive.layout = MenuOnTop;

export default ProjectArchive;
