import Link from "next/link"
import Image from "next/image";
import Slider4 from '../../../public/image 4.png'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function about() {
  return (
    <>
    <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <Image src={Slider4} className="d-block w-100" width={2000} height={740} alt="..." />
    </div>
    <div className="carousel-item">
      <Image src={Slider4} className="d-block w-100" width={2000} height={740} alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </>
  );
}
