import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

export const useNavigateWithParams = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams()

    return (pathname: string) => {
        navigate({
            pathname, 
            search: `?${createSearchParams(params).toString()}`
        });
    };
};