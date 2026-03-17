export function Footer() {
  return (
    <footer style={{ padding: '28px 0 44px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <span className="muted" style={{ fontSize: 13 ,display:'block',textAlign:'center',width:'100%'}}>
          © {new Date().getFullYear()} Yogeshwaran K. All rights reserved.
        </span>
        {/* <span className="muted" style={{ fontSize: 13 }}>
          Built with React + Vite
        </span> */}
      </div>
    </footer>
  )
}

