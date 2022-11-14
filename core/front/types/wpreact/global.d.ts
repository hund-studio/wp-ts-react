import { FC, PropsWithChildren, ReactNode } from "react";

declare global {
	type Page = FC<{ data: any }> & { layout?: Layout };
	type Layout = FC<PropsWithChildren>;
}
