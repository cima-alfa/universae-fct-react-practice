import {
    NavLink as RNavLink,
    NavLinkRenderProps,
    generatePath,
} from "react-router-dom";

type Props = {
    to: string;
    children: React.ReactNode;
    className?: string | ((props: NavLinkRenderProps) => string | undefined);
    params?: object;
};

const NavLink = ({ to, params = {}, className, children, ...rest }: Props) => {
    to = generatePath(to, params);

    return (
        <RNavLink
            to={to}
            className={(state) =>
                `${
                    state.isActive
                        ? "bg-blue-500 shadow text-gray-100 border-blue-950"
                        : "border-transparent"
                }
                px-3 py-2 rounded border-b-2 hover:bg-blue-500 hover:border-blue-950 hover:text-gray-50 transition-colors
                ${
                    typeof className === "function"
                        ? className(state)
                        : className ?? ""
                }`
            }
            {...rest}
        >
            {children}
        </RNavLink>
    );
};

export default NavLink;
