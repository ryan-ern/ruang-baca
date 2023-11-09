const Wavebot = (color) => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                zIndex: "-1",
                margin: "0",
                position: "relative",
                left: "0",
                bottom: "0",
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                    fill={color}
                    fillOpacity="1"
                    d="M0,192L30,197.3C60,203,120,213,180,181.3C240,149,300,75,360,74.7C420,75,480,149,540,170.7C600,192,660,160,720,170.7C780,181,840,235,900,240C960,245,1020,203,1080,165.3C1140,128,1200,96,1260,90.7C1320,85,1380,107,1410,117.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                ></path>
            </svg>
        </div>
    );
};

export default Wavebot;
