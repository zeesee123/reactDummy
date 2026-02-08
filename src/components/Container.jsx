function Container({ row, children }) {
    return (
        <div className={row ? 'row' : ''}>{children}</div>
    );
}

export default Container;