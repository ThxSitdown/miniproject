
export default function Footer(){
    return(
        <>

        <footer className="footer">
        <div className="container">
            <div className="column">
            <h5>เกี่ยวกับเรา</h5>
            <p>ข้อความเกี่ยวกับบริษัทหรือเว็บไซต์ของคุณที่นี่ อธิบายเกี่ยวกับการให้บริการหรือสิ่งที่น่าสนใจอื่น ๆ</p>
            </div>
            <div className="column">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Service</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            </div>
            <div className="column">
            <h5>บริการ</h5>
            <ul>
                <li><a href="#">Service 1</a></li>
                <li><a href="#">Service 2</a></li>
                <li><a href="#">More Service</a></li>
            </ul>
            </div>
            <div className="column">
            <h5>ติดต่อเรา</h5>
            <ul>
                <li>Address: Suthep, ChaingMai, Thailand</li>
                <li>Email: 999@99999.com</li>
                <li>Tel: +66 999 999 999</li>
            </ul>
            </div>
        </div>
        <div className="copyright">
            © 2024 Company Name. All rights reserved.
        </div>
        </footer>





        </>
        )
    }