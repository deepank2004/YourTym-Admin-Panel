import { Link, useParams } from 'react-router-dom';

const Partnermultipleroutes = ({ active }) => {
    const { id } = useParams()

    const routes = [
        { name: 'Payment', path: `/partnerlists/partner-profile/payment/${id}` },
        { name: 'Documents', path: `/partnerlists/partner-profile/document/${id}` },
        { name: 'Bookings', path: `/partnerlists/partner-profile/bookings/${id}` },
        { name: 'Performance', path: `/partnerlists/partner-profile/performance/${id}` },
        { name: 'Hub', path: `/partnerlists/partner-profile/hub/${id}` },
        { name: 'Credit Balance', path: `/partnerlists/partner-profile/credit-balance/${id}` },
    ];

    return (
        <>
            <div className='usermultipleroutes-container'>
                <div className='usermultipleroutes-main'>
                    {routes.map((route, index) => (
                        <Link to={route.path} className='link' key={index}>
                            <div className='usermultipleroutes-div'>
                                <h6 className={active === route.name ? 'usermultipleroutes-text-active' : 'usermultipleroutes-text'}>
                                    {route.name}
                                </h6>
                                {active === route.name && <div className='usermultipleroutes-line-active'></div>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Partnermultipleroutes;
