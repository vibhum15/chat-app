import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
	// const { loading, logout } = useLogout();

	return (
		<div className="mx-auto">
			<BiLogOut className="w-6 h-6 text-white cursor-pointer" />
		</div>
	);
};
export default LogoutButton;