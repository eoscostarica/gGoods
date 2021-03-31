FROM hasura/graphql-engine:v1.3.3.cli-migrations-v2

ARG hasura_graphql_migrations_dir
ARG hasura_graphql_metadata_dir

ENV HASURA_GRAPHQL_MIGRATIONS_DIR $hasura_graphql_migrations_dir
ENV HASURA_GRAPHQL_METADATA_DIR $hasura_graphql_metadata_dir
ENV PORT 8080
# This is temporary
ENV JWT_SECRET '{"type":"HS256","key":"Jn0oVnI+WylLPCthVDV0WTNoJng3Y208Y0JzeVg2ZFA=","claims_format":"json","issuer":"ggood.io"}'

EXPOSE $PORT

COPY migrations $HASURA_GRAPHQL_MIGRATIONS_DIR
COPY metadata $HASURA_GRAPHQL_METADATA_DIR

CMD graphql-engine \
  serve \
  --database-url $HASURA_GRAPHQL_DATABASE_URL \
  --jwt-secret $JWT_SECRET