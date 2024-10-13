from functools import lru_cache
from time import time

def cache_for(seconds):
    def decorator(func):
        @lru_cache(maxsize=1)
        def wrapped_func(*args, **kwargs):
            return func(*args, **kwargs), time()
        
        def wrapper(*args, **kwargs):
            result, timestamp = wrapped_func(*args, **kwargs)
            if time() - timestamp > seconds:
                wrapped_func.cache_clear()
                result, _ = wrapped_func(*args, **kwargs)
            return result
        
        return wrapper
    return decorator
