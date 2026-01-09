import Link from "next/link";

export default function UserIndexPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>User</h1>
			<nav className="space-x-4 mt-4">
				<Link href="/user/login">Login</Link>
				<Link href="/user/signup">Signup</Link>
			</nav>
		</div>
	);
}
