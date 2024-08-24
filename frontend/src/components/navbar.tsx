import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className="pl-2 flex bg-zinc-300 h-12 items-center gap-5 justify-between">
            <div>
                <Link href={'/login'}>Login</Link>
            </div>
            <div className={'flex gap-5 pr-5'}>
                <Link href={'/about'}>About</Link>
                <Link href={'/dashboard'}>Dashboard</Link>
            </div>

        </div>);
};