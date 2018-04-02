package com.gateway.config;

import java.util.Set;

import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

@Component
public class ProxyFilter extends ZuulFilter{
    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 10000;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        RequestContext context = RequestContext.getCurrentContext();

        @SuppressWarnings("unchecked") Set<String> ignoredHeaders = (Set<String>) context.get("ignoredHeaders");
        ignoredHeaders.remove("authorization");

        return null;
    }
}