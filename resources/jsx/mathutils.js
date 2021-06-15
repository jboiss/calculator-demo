function calculate(oplist)
{
    oplist.reduce((acc, current) => {
        acc.push(current * current);
        return acc;
    }, [])
}

export default calculate;