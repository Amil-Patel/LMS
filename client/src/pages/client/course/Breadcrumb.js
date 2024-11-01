import React from 'react'

const Breadcrumb = () => {
  return (
    <>
      <section className='breadcrumb'>
                <p>
                    <NavLink to="/">Homepage</NavLink>
                    {pathnames.map((pathname, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        return (
                            <span key={pathname}>
                                &gt; <NavLink to={routeTo}>{pathname.charAt(0).toUpperCase() + pathname.slice(1)}</NavLink>
                            </span>
                        );
                    })}
                    
                    {additionalLinks.map((link) => (
                        <span key={link.path}>
                            &gt; <NavLink to={link.path}>{link.name}</NavLink>
                        </span>
                    ))}
                </p>
            </section>

    </>
  )
}

export default Breadcrumb
