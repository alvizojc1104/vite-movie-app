import React, { useState, useCallback } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditIcon, PlusIcon, Users2Icon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Input } from "../ui/input";
import HelperText from "../ux/helper-text";


export type TClassDialog = 'add' | 'join' | null;

const formSchema = z.object({
    newClassName: z.string().min(1, { message: "A new class name is required." }),
})

const joinClassSChema = z.object({
    joinCode: z.string().min(1, { message: "A new class name is required." }),
})

const ClassMenu = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    const joinClassForm = useForm<z.infer<typeof joinClassSChema>>({
        resolver: zodResolver(joinClassSChema),

    })

    const [openDialog, setOpenDialog] = useState<TClassDialog>(null);

    const handleOpen = useCallback((dialog: TClassDialog) => {
        setOpenDialog(dialog);
    }, []);

    const handleClose = useCallback(() => {
        setOpenDialog(null);
    }, []);

    const onSubmit = useCallback(async (data: z.infer<typeof formSchema>) => {
        toast(
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
        )
        handleClose();
        form.reset()
    }, [form, handleClose])

    const onJoinClass = useCallback(async (data: z.infer<typeof joinClassSChema>) => {
        toast(
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
        )
        handleClose();
        joinClassForm.reset()
    }, [handleClose, joinClassForm])

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant={"ghost"} size={"icon"}>
                        <PlusIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleOpen('add')}>
                            <EditIcon />
                            <span>Add new class</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpen('join')}>
                            <Users2Icon />
                            <span>Join class</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openDialog === 'add'} onOpenChange={handleClose}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex flex-row items-center justify-start gap-2">
                            <EditIcon className="w-4 h-4" />
                            Create a new class
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Start by adding a class name and new members.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start space-y-4">
                            <FormField
                                control={form.control}
                                name="newClassName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New class name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter new class name" {...field} type="text" className="shadow-none" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <HelperText type="info" message="You can add your members later." />
                            <AlertDialogFooter className="mt-4">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button type="submit" >Add new class</Button>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={openDialog === 'join'} onOpenChange={handleClose}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex flex-row items-center justify-start gap-2">
                            <Users2Icon className="w-4 h-4" />
                            Join class
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Please enter the class code to join.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Form {...joinClassForm}>
                        <form onSubmit={joinClassForm.handleSubmit(onJoinClass)} className="flex flex-col justify-start">
                            <FormField
                                control={joinClassForm.control}
                                name="joinCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class code:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter new class name" {...field} type="text" className="shadow-none" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <AlertDialogFooter className="mt-4">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button type="submit" >Join class</Button>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default React.memo(ClassMenu);