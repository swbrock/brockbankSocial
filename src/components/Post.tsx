import Image from "next/image";
import React from "react";

const Post = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Add your component content here */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image
                        src="/profile.jpeg"
                        alt="User"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Username</span>
                </div>
                <Image src="/more.png" alt="more" width={16} height={16} />
            </div>
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    <Image
                        src="/profile.jpeg"
                        alt="more"
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <p>
                    SDF SDF SDFSDF SDFSDFWEF DFGSDFGSDFG SDFGWRGGSDFG SDFG RGF
                    ERFW EFGS DFG SDFG DFG SDFAF QWERF WERF{" "}
                </p>
            </div>
            <div></div>
        </div>
    );
};

export default Post;
