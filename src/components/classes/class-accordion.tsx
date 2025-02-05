/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, EyeOffIcon, PlusCircleIcon, Users2Icon } from "lucide-react";
import { sampleClasses } from "@/data/classes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { toast } from "sonner";

// Define Zod schema for new channel form
const newChannelSchema = z.object({
    channelName: z.string().min(1).max(255),
    description: z.string().min(1).max(500),
});


const ClassAccordion = () => {
    const location = useLocation(); // Get current URL path
    const { classId, channel } = useParams(); // Extract route parameters
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [classname, setClassname] = useState("")
    const [activeChannel, setActiveChannel] = useState<{ className: string; channel: string } | null>(
        null
    );


    // Update active channel whenever location or params change
    useEffect(() => {
        if (classId && channel) {
            setActiveChannel({
                className: classId.toLowerCase(),
                channel: channel.toLowerCase(),
            });
        }
    }, [classId, channel, location.pathname]);

    const clickOptions = useCallback((url: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event propagation
        navigate(url)
    }, [navigate]);

    const openDialog = useCallback((e: React.MouseEvent, classname: string,) => {
        e.stopPropagation(); // Prevent event propagation
        setOpen(true);
        setClassname(classname)
    }, []);

    return (
        <div>
            <Accordion defaultValue={[]} type="multiple" className="w-full h-fit">
                {sampleClasses.map((room, index) => {

                    const createSlug = (url: string) => {
                        return url.split(" ")
                            .join("-")
                            .toLowerCase()
                    }

                    const roomNameSlug = createSlug(room.name)

                    // Get the first two words of room.name
                    const initials = room.name
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase();


                    return (
                        <div key={index}>
                            <AccordionItem value={room.name}>
                                <AccordionTrigger className="group w-full">
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-2">
                                            <Avatar className="h-8 w-8 border rounded-lg">
                                                <AvatarImage src={room.name} alt={room.name} />
                                                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                                            </Avatar>
                                            <p className="text-sm">{room.name}</p>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button

                                                    size={"icon"}
                                                    variant={"ghost"}
                                                >
                                                    <EllipsisVertical />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem onClick={(e) => openDialog(e, room.name)}>
                                                        <PlusCircleIcon />
                                                        Add new channel
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => clickOptions(`/f/class/${roomNameSlug}/members`, e)}>
                                                        <Users2Icon />
                                                        <span>View members</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <EyeOffIcon />
                                                        Hide class
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col justify-start items-start overflow-hidden transition-all ease-in-out duration-300">
                                    <ul className="w-full">
                                        {room.channels.map((channelItem, index) => {
                                            // Build the path for the current channel
                                            const channelPath = `/f/class/${roomNameSlug}/${createSlug(channelItem.name)}`;

                                            // Determine if this channel is active
                                            const isActive =
                                                activeChannel?.className === roomNameSlug &&
                                                activeChannel?.channel === createSlug(channelItem.name);

                                            return (
                                                <li key={index}>
                                                    <Link to={channelPath}>
                                                        <button
                                                            className={`w-full text-start transition-colors p-2 rounded-md text-sm ${isActive
                                                                ? "bg-gray-200 font-semibold" // Active style
                                                                : "hover:bg-gray-100" // Default hover style
                                                                }`}
                                                        >
                                                            {channelItem.name}
                                                        </button>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                    );
                })}
            </Accordion>
            <CreateNewChannel open={open} setOpen={setOpen} classname={classname || "Null"} />
        </div>
    );
};

export default React.memo(ClassAccordion);

export type TNewChannel = {
    classname: string;
    open: boolean;
    setOpen: any;
}

const CreateNewChannel: React.FC<TNewChannel> = ({ classname, open, setOpen }) => {
    const form = useForm<z.infer<typeof newChannelSchema>>({
        resolver: zodResolver(newChannelSchema),
    });

    const onSubmit = useCallback(
        async (data: z.infer<typeof newChannelSchema>) => {
            // Display success toast
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            );
            // Close the dialog
            setOpen(false);
            form.reset()
        },
        [setOpen, form]
    );

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-start gap-2">
                        <Users2Icon className="w-4 h-4" />
                        Add new channel
                    </AlertDialogTitle>
                    <AlertDialogDescription>Class: {classname}</AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col justify-start space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="channelName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New channel:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter new channel"
                                            {...field}
                                            type="text"
                                            className="shadow-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter channel description"
                                            {...field}
                                            type="text"
                                            className="shadow-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button type="submit">Create channel</Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};
