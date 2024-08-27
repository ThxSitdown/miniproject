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
      <div className="col-3">

      </div>
      <div className="col-6 text-center">
      <div className="row">
            <span>สาขาวิชาเทคโนโลยีสารสนเทศ</span><br />
            <span>วิทยาลัยเทคนิคเชียงใหม่ สถาบันการอาชีวศึกษาภาคเหนือ 1</span><br />
            <span>เลขที่ 9 ถนนเวียงแก้ว ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50200</span><br />
            <span>โทรศัพท์ : 053 217 708 | โทรสาร : 053 221 599 | อีเมล : ctc@cmtc.ac.th</span><br />
          </div>
      </div>
      <div className="col-3">

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
          <iframe width={900} height={450} style={{border: 0}} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30216.943449712708!2d98.983919!3d18.792897!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3a9a71d80adf%3A0xe41f657fc5052416!2z4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LmA4LiX4LiE4LiZ4Li04LiE4LmA4LiK4Li14Lii4LiH4LmD4Lir4Lih4LmI!5e0!3m2!1sth!2sth!4v1724754679352!5m2!1sth!2sth" />
        </p>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
