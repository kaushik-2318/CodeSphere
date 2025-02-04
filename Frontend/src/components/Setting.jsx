import ChangePassword from "../components/ChangePassword"
import ChangeEmail from "../components/ChangeEmail"
import ChangePhoneNumber from "../components/ChangePhoneNumber"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function Settings() {
    return (
        <>
            <div className="container mx-auto bg-[#1f2937] min-h-screen pt-24 text-white w-full z-[1] pl-20 pr-20">
                <motion.h1 className="text-4xl font-bold text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    Account Settings
                </motion.h1>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} >

                    <Tabs defaultValue="email" className="w-full flex justify-center items-center h-[25rem]">
                        
                        <TabsList className="flex justify-center w-[50%] items-start gap-10 flex-col h-fit">
                            <TabsTrigger value="email">Email</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="phone">Phone Number</TabsTrigger>
                        </TabsList>

                        <TabsContent className="w-[50%]" value="password">
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Change Password</CardTitle>
                                    <CardDescription className="text-gray-400">Update your account password here.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChangePassword />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent className="w-[50%]" value="email">
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Change Email</CardTitle>
                                    <CardDescription className="text-gray-400">Update your email address here.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChangeEmail />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent className="w-[50%]" value="phone">
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Change Phone Number</CardTitle>
                                    <CardDescription className="text-gray-400">Update your phone number here.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChangePhoneNumber />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </>
    )
}

