import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

const faqs = [
    { question: "What is Netflix?", answer: "Netflix is a streaming service that offers a variety of TV shows, movies, anime, and documentaries." },
    { question: "How much does Netflix cost?", answer: "Netflix offers different pricing plans. You can check their official website for details." },
    { question: "Where can I watch?", answer: "You can watch Netflix on your smart TV, phone, tablet, or streaming device with an internet connection." },
    { question: "How do I cancel?", answer: "You can cancel anytime online through your account settings—no contracts or cancellation fees." },
    { question: "Is Netflix good for kids?", answer: "Yes! Netflix has a dedicated kids' section with parental controls." },
];

const links = [
    "FAQ", "Help Center", "Account", "Media Center",
    "Investor Relations", "Jobs", "Ways to Watch",
    "Terms of Use", "Privacy", "Cookie Preferences",
    "Corporate Information", "Contact Us"
];

const Footer = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="bg-black text-gray-300 py-16 px-8 sm:px-24">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-10">Frequently Asked Questions</h2>

            <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-6 border-b border-gray-700 pb-4">
                        <button
                            className="w-full flex justify-between items-center text-2xl font-semibold py-4"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            {faq.question}
                            <ChevronDownIcon
                                className={`w-8 h-8 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                            />
                        </button>
                        {openIndex === index && (
                            <p className="text-gray-400 text-lg mt-2 transition-all duration-300">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto bg-gray-900 p-8 mt-12 rounded-2xl shadow-xl">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-lg">
                    {links.map((link, idx) => (
                        <a key={idx} href="#" className="hover:underline text-gray-400">
                            {link}
                        </a>
                    ))}
                </div>
            </div>

            <p className="mt-10 text-center text-lg text-gray-500">
                Netflix Clone by <span className="font-bold text-white">Preet</span> © 2025
                <div className="mt-5 justify-center text-center text-lg text-gray-500 flex gap-3">
                    <a href=""><img className="size-12" src="/linkedinlogo.png" alt="" /></a>
                    <a href=""><img className="size-12" src="/instalogo.png" alt="" /></a>
                    <a href=""><img className="size-12" src="/githublogo.png" alt="" /></a>
                 
                    

                </div>
            </p>
        </div>
    );
};

export default Footer;
