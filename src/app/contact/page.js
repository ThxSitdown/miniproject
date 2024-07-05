import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import logov1 from "../../../public/logov1.png"

export default function Contact() {
  return (
    <>
    <div>
  <div className="text-center my-4 fs-5 fw-bold "><h1>ที่อยู่ติดต่อ</h1></div>
  <div className="container text-center">
    <div className="row">
      <div className="col-6">

        <div className="text-left"><div className="row">
            <span>กองเทคโนโลยีดิจิทัล</span><br />
            <span>สำนักงานมหาวิทยาลัย มหาวิทยาลัยแม่โจ้</span><br />
            <span>63 หมู่ 4 ตำบลหนองหาร อำเภอสันทราย จังหวัดเชียงใหม่ 50290</span><br />
            <span>Technology Digital Division : Maejo University ChiangMai - Phrao Road , Sansai ChiangMai Thailand 50290 Tel (66-53)873282</span><br />
          </div>
        </div>
      </div>
      <div className="col-3 text-left">
        <p>ผู้อำนวยการ</p>
        <p>งานอำนวยการ</p>
        <p>งานเครือข่ายและบริการอินเตอร์เน็ต</p>
        <p>งานพัฒนาสื่อสารสนเทศ</p>
        <p>งานวิจัยและพัฒนา</p>
      </div>
      <div className="col-3">
        <p>0-5387-3268</p>
        <p>0-5387-3262</p>
        <p>0-5387-3270</p>
        <p>0-5387-3291</p>
        <p>0-5387-3285</p>
      </div>
    </div>
  </div>
  {/*section 2*/}
  <div className="container">
    <div className="panel panel-info">
      <div className="panel-heading text-center">
        <strong><span className="glyphicon glyphicon-map-marker" /> ตำแหน่งที่ตั้ง</strong>
      </div>
      <div className="panel-body">
        <p style={{textAlign: 'center'}}>
          <iframe width={900} height={450} style={{border: 0}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.8038072348804!2d99.01047347477073!3d18.89578295760628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da23fb2078c8a1%3A0x326a284810429a08!2z4LiX4Li14LmI4LiX4Liz4LiH4Liy4LiZIOC4qOC4ueC4meC4ouC5jCBJVA!5e0!3m2!1sth!2sth!4v1709001837705!5m2!1sth!2sth" frameBorder={0} allowFullScreen="allowfullscreen" />
        </p>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
