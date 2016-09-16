from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from photo_editor import views


urlpatterns = [
    # acquire and refresh JWT token
    url(r'^auth/login', obtain_jwt_token, name='user-login'),
    url(r'^auth/api-token-refresh/', refresh_jwt_token),

    # url for creating and deleting images
    url(r'^images/$', views.ImageCreateDeleteView.as_view(),
        name='create-image'),
    url(r'^images/(?P<image_id>[0-9]+)$',
        views.ImageCreateDeleteView.as_view(),
        name='delete-image'),

    # folder views
    url(r'^folders/$', views.FolderList.as_view(), name='folder-list'),
    url(r'^folders/(?P<pk>[0-9]+)$',
        views.FolderDetail.as_view(),
        name='folder-detail'),

    # image processor view
    url(r'^filter/(?P<image_id>[0-9]+)/(?P<action>\w+)$',
        views.ProcessImage.as_view(),
        name='process_image'),
    url(r'^filter/(?P<image_id>[0-9]+)/(?P<action>\w+)/(?P<option>\w+)$',
        views.ProcessImage.as_view(),
        name='process_image'),
    url(r'^filter/(?P<image_id>[0-9]+)/(?P<action>\w+)/(?P<left>[0-9]+)/(?P<upper>[0-9]+)/(?P<right>[0-9]+)/(?P<lower>[0-9]+)/$',
        views.ProcessImage.as_view(),
        name='process_image'),

    # cancel changes
    url(r'^filter/cancel/(?P<image_id>[0-9]+)$',
        views.RevertToOriginal.as_view(),
        name='cancel_changes'),

    # save changes
    url(r'^filter/save/(?P<image_id>[0-9]+)$',
        views.ApplyImageProcessing.as_view(),
        name='apply_changes'),
]
