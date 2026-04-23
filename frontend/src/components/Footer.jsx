
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    { href: "#", label: "Facebook", icon: FaFacebookF },
    { href: "#", label: "X", icon: FaXTwitter },
    { href: "#", label: "Instagram", icon: FaInstagram },
    { href: "#", label: "LinkedIn", icon: FaLinkedinIn },
  ];

  return (
    <div>
        <hr className='border border-grey-300 dark:border-grey-700' />
        <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold">Company Name</h3>
                        <p className="text-muted-foreground">Your trusted partner for all your needs.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a>
                        <a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a>
                        <a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a>
                    </div>
                </div>
                <div className='text-center'>
                    <div>Follow us:</div>
                    <ul className="mt-3 flex items-center justify-center gap-4">
                        {socialLinks.map(({ href, label, icon: Icon }) => (
                          <li key={label}>
                            <a
                              href={href}
                              aria-label={label}
                              className="text-muted-foreground transition-colors hover:text-primary"
                            >
                              <Icon size={18} />
                            </a>
                          </li>
                        ))}
                    </ul>
                </div>
                
        </div>
    </div>
  )
}

export default Footer
