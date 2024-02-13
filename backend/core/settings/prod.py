from .common import *


########
# CORE #
########

DEBUG = False

ALLOWED_HOSTS = [".vercel.app"]

WSGI_APPLICATION = "core.wsgi.app"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "URL": SECRETS["POSTGRES_URL"],
        "USER": SECRETS["POSTGRES_USER"],
        "HOST": SECRETS["POSTGRES_HOST"],
        "PASSWORD": SECRETS["POSTGRES_PASSWORD"],
        "NAME": SECRETS["POSTGRES_DATABASE"],
    }
}

CORS_ALLOWED_ORIGINS = ["https://gymtracker-app.vercel.app"]

SIMPLE_JWT = {
    "SIGNING_KEY": SECRETS["JWT_SECRET_KEY"],
}
