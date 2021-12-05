import React, { useEffect } from 'react'
import Nav from "../../components/Nav"
import Lottie from 'react-lottie-player'
import homeJson from "../../assets/animations/home.json"
import Kanban from "../../assets/animations/kanban.json"
import FileSharing from "../../assets/animations/file-sharing.json"
import "./style.scss"
import CustomButton from "../../components/CustomButton"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ListIcon from '@mui/icons-material/List';
import Typical from 'react-typical'
import { Link } from 'react-router-dom'
const Landing = () => {
    useEffect(() => {
        document.title = "JBoards"
    }, [])
    const intro = [
        {
            icon: <PersonOutlineIcon sx={{ fontSize: 25, color: "#142D4C" }} />,
            title: "Built for Students",
            description: "Developed in view of VIT students to help them manage J Components."
        },
        {
            icon: <DesignServicesIcon sx={{ fontSize: 25, color: "#142D4C" }} />,
            title: "Designed for all",
            description: "Designed to provide a solution for all major roadblocks in project development."
        },
        {
            icon: <ListIcon sx={{ fontSize: 25, color: "#142D4C" }} />,
            title: "Realtime collaboration",
            description: "Manage tasks and work flow of all members in realtime using Kanban boards."
        },
    ]
    const features = [
        {
            animation: Kanban,
            title: "Manage Tasks using Kanban Lists",
            description: "It helps in managing tasks in realtime and also look at other’s progress.",
        },
        {
            animation: FileSharing,
            title: "Store Files at one location",
            description: "Store files using Fireabse Storage. Don’t have to send copies through Whatsapp.",
        }
    ]
    return (
        <div className="landing-page">
            <div className="landing">
                <Nav />
                <div className="landing__body">
                    <div className="landing__body-left">
                        <h1>
                            Make you project more
                            <Typical
                                steps={['Collaborative !', 2000, 'Organized !', 2500]}
                                loop={Infinity}
                                wrapper="div"
                            />
                        </h1>
                        <p>JBoards helps you manage J Components and save you all that pain.</p>
                        <Link to="/signup">
                            <CustomButton
                                label="Get Started"
                                variant="contained"
                            />
                        </Link>
                    </div>
                    <div className="landing__body-right">
                        <Lottie
                            loop
                            animationData={homeJson}
                            play
                            style={{ width: "90%", height: "90%" }}
                        />
                    </div>
                </div>
            </div>
            <div className="intro">
                <div className="intro_sections">
                    {intro.map((intro_element, index) => (
                        <IntroSection
                            key={index}
                            icon={intro_element.icon}
                            title={intro_element.title}
                            description={intro_element.description}
                        />
                    ))}
                </div>
            </div>
            <div className="features">
                <div className="features__header">
                    <span>FEATURES</span>
                    <h1>The powerful features make it suitable for all projects</h1>
                </div>
                {features.map((feature_element, index) => (
                    <FeaturesSection
                        key={index}
                        animation={feature_element.animation}
                        title={feature_element.title}
                        description={feature_element.description}
                    />
                ))}
            </div>
            <div className="get_started">
                <span>GET STARTED</span>
                <h2>Get Started with JBoards today</h2>
                <Link to="/signup">
                    <CustomButton
                        label="Get Started"
                        variant="contained"
                    />
                </Link>
            </div>
            <hr />
            <div className="footer">
                <span>&copy; JBoards. {new Date().getFullYear()}. All Rights Reserved.</span>
                <p>When you visit or interact with our sites, services or tools, we or our authorised service providers may use cookies for storing information to help provide you with a better, faster and safer experience and for marketing purposes.</p>
            </div>
        </div >
    )
}

const IntroSection = ({ icon, title, description }) => {
    return (
        <div className="introSection">
            <div className="introSection__body">
                <div className="introSection__icon">
                    {icon}
                </div>
                <div className="introSection__details">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

const FeaturesSection = ({ animation, title, description }) => {
    return (
        <div className="featuresSection">
            <div className="featuresSection-left">
                <Lottie
                    loop
                    animationData={animation}
                    play
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
            <div className="featuresSection-right">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Landing
