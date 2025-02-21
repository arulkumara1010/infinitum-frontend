"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Phone, Linkedin, Instagram } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "group rounded-lg border-[0.5px] border-gray-600/50",
        "transition-all duration-200 ease-in-out",
        isOpen ? "bg-gray-800" : "hover:bg-gray-700"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between gap-4"
      >
        <h3 className="text-base font-medium text-gray-300 text-left">
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-400 dark:text-gray-300"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: "easeOut" },
              opacity: { duration: 0.25 },
            }}
          >
            <div className="px-6 pb-4 pt-2">
              <motion.p className="text-sm text-gray-400 leading-relaxed">
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FaqInfinitum2025() {
  const faqs: Omit<FAQItemProps, "index">[] = [
    {
      question: "What is INFINITUM 2025?",
      answer:
        "INFINITUM 2025 is the annual tech fest organized by CSEA at PSG College of Technology. It features a hackathon, technical workshops, cybersecurity challenges, and fun non-tech events.",
    },
    {
      question: "Who can participate in the hackathon?",
      answer:
        "The hackathon is open to all students passionate about coding, AI, and problem-solving. Teams will compete to build innovative solutions within a given timeframe.",
    },
    {
      question: "What workshops are available?",
      answer:
        "We offer a workshop on Ikigai in AI, which explores the intersection of artificial intelligence and human values. Participants will learn about ethical AI and its applications and how to navigate the AI landscape",
    },
    {
      question: "Are there non-technical events?",
      answer:
        "Yes! We have Family Feud and AI StoryQuest which offer engaging experiences beyond coding.",
    },
    {
      question: "How can I register?",
      answer:
        "You can register through this website by filling out the registration form.",
    },
  ];

  const contactsData = [
    {
      category: "CSEA",
      linkedin: "https://www.linkedin.com/in/cseapsgtech/",
      instagram: "https://www.instagram.com/csea_psgtech/",
      contacts: [
        { name: "Arul Kumara", phone: "+91 86102 02823" },
        { name: "Sreeraghavan", phone: "+91 63857 86223" },
      ],
    },
    {
      category: "The EYE",
      linkedin:
        "https://www.linkedin.com/company/theeye-csea/posts/?feedView=all",
      instagram: "https://www.instagram.com/theeye_psgtech/",
      contacts: [
        { name: "Lohith", phone: "+91 94881 25100" },
        { name: "Mehul", phone: "+91 86087 15000" },
      ],
    },
    {
      category: "GHCC",
      linkedin: "https://www.linkedin.com/company/github-campus-club-psgtech/",
      instagram: "https://www.instagram.com/ghcc_psgtech/",
      contacts: [
        { name: "Pon Manoj", phone: "+91 76038 34434" },
        { name: "Shashwath", phone: "+91 98456 77934" },
      ],
    },
  ];

  return (
    <section className="py-16 w-full bg-black">
      <div className="container px-4 mx-auto">
        <motion.div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400">
            Get all the answers about our tech fest!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <br />
        <br />
        <motion.div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
          <p className="text-sm text-gray-400">
            Reach out to our team for any queries!
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          {contactsData.map((group, index) => (
            <div key={index} className="text-lg text-center">
              {/* Category Name with LinkedIn & Instagram Icons */}
              <div className="flex justify-center items-center gap-3 mb-4">
                <p className="font-semibold text-pink-500">{group.category}</p>

                {/* LinkedIn Icon */}
                <a
                  href={group.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                </a>

                {/* Instagram Icon */}
                <a
                  href={group.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-500 transition duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              {/* Contact List - Reduced Font Size */}
              <div className="flex flex-col gap-3">
                {group.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="flex justify-center items-center gap-3"
                  >
                    <p className="font-medium text-sm">{contact.name}</p>

                    {/* Phone Icon with Clickable Number */}
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-1 hover:text-blue-400 text-sm"
                    >
                      <Phone className="h-4 w-4 text-gray-400" />
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FaqInfinitum2025;
