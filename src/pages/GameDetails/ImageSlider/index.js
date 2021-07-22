import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.min.css';
export default function ImageSlider(props) {
    const [images, setImages] = useState([]);
    useEffect(() => {
        let tmpImages = [];
        for (let key in props.images) {
            tmpImages.push(props.images[key]);
        }
        setImages(tmpImages);
    }, [props.images]);


    return (
        <div>
            <Carousel fade >
                {images.map((image, index) => <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt="Slides"
                    />
                </Carousel.Item>)}
            </Carousel>
        </div>

    )
}