import SectionTitle from './../Components/SectionTitle';
import office from "../assets/office.jpg"
import { MdPhone } from 'react-icons/md';
import { FaFacebook, FaHeadphones, FaInstagramSquare ,} from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const ContactUs = () => {
    return (
        <div>
            <div>
                <img className='h-[50vh] w-full' src={office} alt="" />
            </div>
            <SectionTitle title='contact us'></SectionTitle>
            <div className="flex w-full justify-around flex-col lg:flex-row">
                <div className='ml-2 md:ml-0'>
                    <p className='py-2 text-lg font-semibold'>Our Office Location :</p>
                    <p>UTC building , 8th Floor , Panthapath , Dhaka</p>
                    <p className='py-2 text-lg font-semibold'>Our Contact Numbers : </p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><MdPhone /></span> 0123456789</p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><MdPhone /></span> 0123456788</p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><MdPhone /></span> 0123456787</p>
                </div>
                <div className="divider lg:divider-horizontal">OR</div>
                <div className='ml-2 md:ml-0 my-2'>
                    <p className='py-2 text-lg font-semibold'>Connect to us Through Socials</p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><FaFacebook /></span> Parcel Cloud</p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><FaInstagramSquare /></span> parcel_cloud</p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><BsTwitterX /></span> parcel_cloud</p>
                </div>
            </div>
            <div className='md:ml-16 my-16 md:my-24 ml-2'>
                 <h3 className='font-semibold text-2xl text-center dark:text-amber-300'>Contact Our Helpline</h3>
                 <div>
                 <p className='my-2 text-lg font-semibold'>Our Contact Numbers : </p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><FaHeadphones /></span> 0123456</p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><FaHeadphones /></span> 0123455</p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><FaHeadphones /></span> 0123456</p>
                    <p className='flex items-center gap-2'> <span className='dark:text-white'><FaHeadphones /></span> 0123459</p>
                 </div>
            </div>
        </div>
    );
};

export default ContactUs;