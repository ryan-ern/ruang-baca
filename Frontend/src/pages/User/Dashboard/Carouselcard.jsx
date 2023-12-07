import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../../assets/styles/common.css";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSearchByJurusan } from "../../../store/actions";

export default function Carouselcard({ onSelectedMajorChange }) {
    const dispatch = useDispatch();
    const [selectedMajor, setSelectedMajor] = useState(null);
    const dataJurusan = useSelector((state) => state.major.response);

    const handleClick = (index) => {
        const selectedMajorName = dataJurusan.data.jurusan[index]?.name;
        setSelectedMajor(selectedMajorName);
        onSelectedMajorChange(selectedMajorName);
    };

    useEffect(() => {
        if (selectedMajor) {
            dispatch(getSearchByJurusan(selectedMajor));
        }
    }, [selectedMajor, dispatch]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
        },
    };
    
    return (
        <Carousel responsive={responsive}>
            {Array.isArray(dataJurusan?.data?.jurusan) &&
                dataJurusan.data.jurusan.map((card, index) => (
                    <Card
                        key={index}
                        text="black"
                        className="text-center cardjurusan p-0 m-2 me-3"
                        onClick={(e) => { e.preventDefault(); handleClick(index)}}
                    >
                        <Card.Body className="cardjurusan-body">
                            <Card.Text className="cardjurusan-text">
                                {card?.name}
                            </Card.Text>
                            <Card.Img className="cardjurusan-img" src={card?.photo} />
                        </Card.Body>
                    </Card>
                ))}
        </Carousel>
    );
}
