#!/bin/bash

ENVPATH=.env

COLORCLEAR="\e[0m"
COLORRED="\e[1;31m"
COLORGREEN="\e[1;32m"

USE_DEFAULTS="y"

read -p "Use defaults (y | n): " USE_DEFAULTS

while [ "$USE_DEFAULTS" != "y" ] && [ "$USE_DEFAULTS" != "n" ]; do
	echo -e "$COLORRED$USE_DEFAULTS is not a valid answer$COLORCLEAR"
	read -p "Use defaults (y | n): " USE_DEFAULTS
done

function gen_env {
	echo "Generating $ENVPATH..."

	#----- Env type
	
	local ENV_TYPE=""
	local ENV_TYPE_ITER="0"

	if [ "$USE_DEFAULTS" == "y" ]; then
		ENV_TYPE="development"
	fi

	while [ "$ENV_TYPE" != "development" ] && [ "$ENV_TYPE" != "production" ]; do
		if ! [ "$ENV_TYPE_ITER" == "0" ]; then
			echo -e "$COLORRED$ENV_TYPE is not a valid answer$COLORCLEAR"
		fi

		read -p "Env type (development | production): " ENV_TYPE

		ENV_TYPE_ITER="1"
	done

	#----- Nginx port

	local NGINX_PORT=""
	local NGINX_PORT_ITER="0"
	local NGINX_PORT_RE="^[0-9]+$"

	if [ "$USE_DEFAULTS" == "y" ]; then
		NGINX_PORT="2000"
	fi

	while ! [[ $NGINX_PORT =~ $NGINX_PORT_RE ]]; do
		if ! [ "$NGINX_PORT_ITER" == "0" ]; then
			echo -e "$COLORRED$NGINX_PORT is not a valid answer$COLORCLEAR"
		fi

		read -p "Nginx port (number): " NGINX_PORT

		NGINX_PORT_ITER="1"
	done

	#----- Result print
	

	echo -e "$COLORGREEN+----- Env variables:$COLORCLEAR"
	echo "Env type : $ENV_TYPE"
	echo "Nginx port : $NGINX_PORT"

	#----- Result save
	
	echo "ENV_TYPE=$ENV_TYPE" >> .env
	echo "NGINX_PORT=$NGINX_PORT" >> .env
}

echo "Checking if $ENVPATH exist..."

if [ -f "$ENVPATH" ]; then
	echo -e "$COLORGREEN$ENVPATH already exist$COLORCLEAR"
else
	echo -e "$COLORRED$ENVPATH doesn't exist$COLORCLEAR"
	gen_env
fi
