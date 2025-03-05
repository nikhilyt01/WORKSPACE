

export const Testimonials =()=>{
    return (<section className="py-20">
    <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-8 ">
        <div>
            <h2 className="text-white text-center font-bold text-[4vw] mb-4">What Our Users Say</h2>
        </div>
        <div className="flex bg-zinc-800 rounded shadow-lg max-w-2xl text-center mx-auto py-6">
            <img src="/profileimgtag.jpg" alt="profile" className="h-12 w-12 rounded-full object-cover mr-2 ml-4"></img>
            <div>
                 <p className=" italic text-zinc-200">"This platform helped me ace my exams! The community is super helpful."</p>
                 <p className="font-semibold "> -Nikhil Singh</p>
            </div>
        </div>
    </div>
    </section>

    )

}