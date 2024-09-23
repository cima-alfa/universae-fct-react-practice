import {
    NavLink as RNavLink,
    NavLinkRenderProps,
    To,
    matchPath,
} from "react-router-dom";

type Props = {
    to: To;
    children: React.ReactNode;
    className?: string | ((props: NavLinkRenderProps) => string | undefined);
};

const NavLink = ({ to, className, children, ...rest }: Props) => {
    return (
        <RNavLink
            to={to}
            className={(state) =>
                `${
                    state.isActive ||
                    (matchPath({ path: "/page?/:page?" }, location.pathname) &&
                        to === "/")
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
