import { useCurrentUser } from "@/hooks/user-current-user";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Icons } from "./icons";
import { logout } from "@/lib/api";

interface UserButton {
    cookies?: boolean;
}

export const UserButton = ({ cookies }: UserButton) => {
    const { isLoading, user } = useCurrentUser(); // Call the hook unconditionally

    const handleLogout = async () => {
        await logout();
        window.location.reload();
        setInterval(() => {
            window.location.href = "/";
        }, 1500);
    };

    // Check if user data should be used based on cookies
    const isUserAvailable = cookies ? user : null;

    return (
        <div className="flex items-center justify-between space-x-2 md:justify-end">
            {isLoading && (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            )}
            {isUserAvailable ? ( // Use isUserAvailable instead of user
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 rounded-full">
                            <Avatar className="size-8">
                                <AvatarImage
                                    src={isUserAvailable?.profilePicture || ""}
                                    className="rounded-full"
                                />
                                <AvatarFallback>
                                    {isUserAvailable?.displayName?.charAt(0) ||
                                        "U"}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuItem className="flex flex-col items-start gap-1 bg-background/95">
                            <div className="text-xs font-medium">
                                {isUserAvailable?.displayName}
                            </div>
                            <div className="text-xs text-muted-foreground truncate max-w-48">
                                {isUserAvailable?.email}
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="py-2">
                            <Link href={"/dashboard"}>
                                <Icons.dashboard className="w-4 h-4 mr-2" />
                                <span>Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="py-2">
                            <Link href={"/setting"}>
                                <Icons.setting className="w-4 h-4 mr-2" />
                                <span>Setting</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <Icons.logout className="w-4 h-4 mr-2" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                !isLoading && (
                    <>
                        <Link href={"/sign-in"}>
                            <Button variant={"signIn"}>Masuk</Button>
                        </Link>
                        <Link href={"/sign-up"}>
                            <Button variant={"signUp"}>Daftar</Button>
                        </Link>
                    </>
                )
            )}
        </div>
    );
};
