import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
    return (
        <>
            <div className="mb-xl w-full whitespace-pre-line flex flex-col md:text-center md:items-center mx-auto justify-center mb-fluid-sm">
                <p className="text-dark font-bold text-4xl thd-heading-xs mb-fixed-sm">
                    Cognitive Affective Maps
                </p>
                <br />
                <div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl w-9/12">
                    Think of <span className="text-green">this</span>, connect{" "}
                    <span className="text-red">that</span>, and let us map{" "}
                    <span className="text-yellow">people's mind</span>
                </div>
                <br />
                <div className="text-2xl w-8/12">
                    Uncover the hidden connections, unlock the power of
                    emotions, and embark on a journey of discovery with
                    Cognitive Affective Maps.
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>

            <div className="flex justify-center h-[600px]">
                <div className="rounded-3xl shadow-2xl shadow-orange ">
                    <Image
                        width={900}
                        height={600}
                        src="./canvas.png"
                        className="rounded-3xl grid"
                    />
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="mb-xl w-full whitespace-pre-line flex flex-col md:text-center md:items-center mx-auto justify-center mb-fluid-sm">
                <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl w-9/12">
                    Why using Cognitive Affective Maps?
                </div>
                <br />
                <ul>
                    <li className="break-inside-avoid">
                        <div>
                            <div className="mb-fixed-md flex items-center">
                                <span className="h-[44px] w-[44px] mr-16 inline-block flex-shrink-0 items-center justify-center rounded-full">
                                    <span className="block bg-blue rounded-full p-2">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                                                fill="green"
                                            ></path>
                                        </svg>
                                    </span>
                                </span>
                                <span className="text-thd-color-green-80 thd-body-md">
                                    To visually map out the connections
                                </span>
                            </div>
                        </div>
                    </li>
                    <li className="break-inside-avoid">
                        <div>
                            <div className="mb-fixed-md flex items-center">
                                <span className="h-[44px] w-[44px] mr-16 inline-block flex-shrink-0 items-center justify-center rounded-full">
                                    <span className="block bg-blue rounded-full p-2">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                                                fill="green"
                                            ></path>
                                        </svg>
                                    </span>
                                </span>
                                <span className="text-thd-color-green-80 thd-body-md">
                                    Discover how emotions impact
                                    decision-making, problem-solving, and
                                    information processing
                                </span>
                            </div>
                        </div>
                    </li>
                    <li className="break-inside-avoid">
                        <div>
                            <div className="mb-fixed-md flex items-center">
                                <span className="h-[44px] w-[44px] mr-16 inline-block flex-shrink-0 items-center justify-center rounded-full">
                                    <span className="block bg-blue rounded-full p-2">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z"
                                                fill="green"
                                            ></path>
                                        </svg>
                                    </span>
                                </span>
                                <span className="text-thd-color-green-80 thd-body-md">
                                    Uncover the key factors influencing
                                    perception and interpretation
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Home;
