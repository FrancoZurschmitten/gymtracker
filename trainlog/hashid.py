from rest_framework import routers
from hashids import Hashids


class HashidRouter(routers.DefaultRouter):
    def __init__(self, *args, **kwargs):
        self.hashids = Hashids(
            salt="gymtracker", min_length=10, alphabet="0123456789abcdef"
        )
        super().__init__(*args, **kwargs)

    def get_urls(self):
        urls = super().get_urls()

        for url in urls:
            if hasattr(url.callback, "kwargs"):
                kwargs = url.callback.kwargs
                for key, value in kwargs.items():
                    if key.endswith("_pk"):
                        kwargs[key] = self.hashids.encode(value)
                url.callback.kwargs = kwargs

        return urls
