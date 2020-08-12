from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('api/create-user/', views.User.as_view(), name='create_new_user'),
    path('api/api-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/events/', views.Events.as_view(), name='events'),
    path('api/event/<str:event_id>/', views.EventDetail.as_view(), name='event')
]