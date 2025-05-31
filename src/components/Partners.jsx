const Partners = () => {
    const logos = ['https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?ga=GA1.1.76953405.1704461102&semt=ais_hybrid&w=740', 'https://img.freepik.com/free-psd/social-media-logo-design_23-2151296987.jpg?ga=GA1.1.76953405.1704461102&semt=ais_hybrid&w=740', 'Microsoft', 'Amazon'];
    return (
        <div className="py-10 text-center">
            <h2 className="text-2xl font-bold mb-6">Our Partners</h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
                {logos.map((logo, idx) => (
                    <div key={idx} className="text-xl font-semibold text-gray-700 flex flex-col items-center justify-center">
                        <img src={logo} alt="" className="w-20" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Partners;
