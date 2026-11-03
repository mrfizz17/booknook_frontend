import AnimatedArrival from '@/components/home/AnimatedArrival';
import React from 'react';

const AllBooks = async () => {

    const res = await fetch("http://localhost:8000/api/all-books");

    const allBooks = await res.json();
    return (
    <>
       <section
      id="all-books"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >

    <div className="relative overflow-hidden rounded-[1.75rem] bg-dark text-paper p-10">
        {/* dotted texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(251,248,243,0.16) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[8%] size-72 rounded-full bg-amber/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-[12%] size-80 rounded-full bg-teal/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 right-1/3 size-56 rounded-full bg-terracotta/20 blur-3xl"
        />

     
       


      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">
            Fresh on the shelf
          </p>
          <h2 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-white">
            All Books
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The latest books added by our readers.
          </p>
        </div>
      </div>

     

   


        

        
      </div>
       <AnimatedArrival books={allBooks} />


      </section>
    
    </>
    
    );
};

export default AllBooks;