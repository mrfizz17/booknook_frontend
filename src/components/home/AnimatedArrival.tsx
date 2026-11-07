"use client"
import { motion } from "framer-motion";
import BookCard from '../shared/BookCard';
import type { Book } from "@/types/book";
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};


const AnimatedArrival = ({ books }: { books: Book[] }) => {
    return (
        <motion.div
        variants={gridVariants}
        // initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {books.map((book) => (
          <motion.div key={book._id} variants={cardVariants}>
            
            <BookCard book={book} />
          </motion.div>
        ))}
      </motion.div>
    );
};

export default AnimatedArrival;