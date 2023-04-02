import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IconType } from 'react-icons'

interface SidebarItemProps {
    href?: string;
    label: string;
    icon: IconType;
    onClick?: () => void;
    auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, icon: Icon, onClick, auth }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const { data : currentuser } = useCurrentUser();

    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        }

        if (auth && !currentuser) {
            loginModal.onOpen()
        } 
        else if (href) {
            router.push(href);
        }
    }, [router, onClick, href, currentuser, auth, loginModal]);

    return (
        <div onClick={handleClick} className='flex flex-row items-center'>
            {/* Mobile Menu */}
            <div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
                <Icon size={28} color='white' />
            </div>
            {/* Desktop Menu */}
            <div className='relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center'>
                <Icon size={24} color='white' />
                <p className='hidden lg:block text-white text-xl'>{label}</p>
            </div>
        </div>
    )
}

export default SidebarItem